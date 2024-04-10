def get_object_info(db, object_id):
    safe_object_id = object_id.replace("'", "''")

    query = f"""
    SELECT o.id, o.name, o.city, o.lon, o.lat, o.rate, o.description, p.base64, k.type
    FROM object o
    LEFT JOIN obj_photo op ON o.id = op.id_obj
    LEFT JOIN photo p ON op.id_photo = p.id
    LEFT JOIN obj_kind ok ON o.id = ok.id_obj
    LEFT JOIN kind k ON ok.id_kind = k.id
    WHERE o.id = '{safe_object_id}'
    """
    return db.get(query)


def get_filtered_objects_info(db, city=None, kind=None, rate=None, limit=1, offset=10):
    where_clauses = []

    if city:
        where_clauses.append(f"o.city = {city}")

    if kind:
        where_clauses.append(f"k.type = {kind}")

    if rate:
        where_clauses.append(f"o.rate = {rate}")

    # query = """
    # SELECT o.id, o.name, o.city, o.lon, o.lat, o.rate, o.description, p.base64, k.type
    # FROM object o
    # LEFT JOIN obj_photo op ON o.id = op.id_obj
    # LEFT JOIN photo p ON op.id_photo = p.id
    # LEFT JOIN obj_kind ok ON o.id = ok.id_obj
    # LEFT JOIN kind k ON ok.id_kind = k.id
    # """

    query = """
        SELECT 
            o.id, 
            o.name, 
            o.city, 
            o.lon, 
            o.lat, 
            o.rate, 
            o.description,
            p.base64
        FROM object o
        LEFT JOIN (
            SELECT 
                op.id_obj,
                p.base64,
                ROW_NUMBER() OVER(PARTITION BY op.id_obj ORDER BY p.id ASC) as rn
            FROM obj_photo op
            JOIN photo p ON op.id_photo = p.id
        ) as p ON o.id = p.id_obj AND p.rn = 1
    """

    if where_clauses:
        query += " WHERE " + " AND ".join(where_clauses)

    query += f" LIMIT {limit} OFFSET {offset}"

    result = db.get(query)

    formatted_result = [
        {
            "id": row[0],
            "photo": row[7],
            "name": row[1],
            "description": row[6],
            "coordinates": [row[3], row[4]],
            "city": row[2],
        }
        for row in result
    ]

    return formatted_result
