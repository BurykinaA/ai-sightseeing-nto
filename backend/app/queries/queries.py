from app.connection.sqllite3_connection import Sqlite3Connection


def get_object_info(object_id):
    query = f"""
            SELECT 
                o.id, 
                o.name, 
                o.city, 
                o.lon, 
                o.lat, 
                o.rate, 
                o.description,
                o.type,
                (SELECT GROUP_CONCAT(p.base64) FROM photo_obj p WHERE p.id_obj = o.id) as base64
            FROM object o
            WHERE o.id = '{object_id}'
    """
    db = Sqlite3Connection()

    result = db.get(query)

    formatted_result = [
        {
            "id": row[0],
            "name": row[1],
            "description": row[6],
            "coordinates": [float(row[3]), float(row[4])],
            "city": row[2],
            "type": row[7],
            "rate": row[5],
            "photo": row[8].split(",") if row[8] else [],
        }
        for row in result
    ]

    return formatted_result


def get_filtered_objects_info(city=None, kind=None, rate=None, limit=1, offset=10):
    where_clauses = []

    if city:
        where_clauses.append(f"o.city = '{city}'")

    if kind:
        where_clauses.append(f"{kind} in k.type")

    if rate:
        where_clauses.append(f"o.rate = {rate}")

    query = """
        SELECT 
            o.id, 
            o.name, 
            o.city, 
            o.lon, 
            o.lat, 
            o.rate, 
            o.description,
            o.type,
            (SELECT p.base64 FROM photo_obj p WHERE p.id_obj = o.id LIMIT 1) as base64
        FROM object o
    """

    if where_clauses:
        query += " WHERE " + " AND ".join(where_clauses)

    query += f" LIMIT {limit} OFFSET {offset}"

    db = Sqlite3Connection()

    print(query)

    result = db.get(query)
    formatted_result = [
        {
            "id": row[0],
            "photo": row[8],
            "name": row[1],
            "description": row[6],
            "coordinates": [row[4], row[3]],
            "city": row[2],
            "rate": row[5],
            "type": row[7],
        }
        for row in result
    ]

    return formatted_result


def get_coords():
    query = """
        SELECT 
            o.id, 
            o.name, 
            o.lon, 
            o.lat
        FROM object o
    """

    db = Sqlite3Connection()

    result = db.get(query)
    formatted_result = [
        {
            "id": row[0],
            "coordinates": [row[3], row[2]],
            "name": row[1],
            "description": row[6],
        }
        for row in result
    ]

    return formatted_result
