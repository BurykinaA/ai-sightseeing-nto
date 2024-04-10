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


def get_filtered_objects_info(db, city=None, kind=None, rate=None):
    where_clauses = []
    
    # Для безопасности используйте параметризованные запросы вместо форматирования строк
    params = {}
    
    if city:
        city = city.replace("'", "''")  # Лучше использовать параметризованные запросы
        where_clauses.append("o.city = :city")
        params["city"] = city
        
    if rate:
        kind = kind.replace("'", "''")  # И здесь тоже
        where_clauses.append("k.type = :kind")
        params["kind"] = kind

    if kind:
        rate = rate.replace("'", "''")  # И здесь тоже
        where_clauses.append("o.rate = :rate")
        params["rate"] = rate

    # Формируем базовый запрос
    query = """
    SELECT o.id, o.name, o.city, o.lon, o.lat, o.rate, o.description, p.base64, k.type
    FROM object o
    LEFT JOIN obj_photo op ON o.id = op.id_obj
    LEFT JOIN photo p ON op.id_photo = p.id
    LEFT JOIN obj_kind ok ON o.id = ok.id_obj
    LEFT JOIN kind k ON ok.id_kind = k.id
    """
    
    # Добавляем условия WHERE, если они есть
    if where_clauses:
        query += " WHERE " + " AND ".join(where_clauses)
    
    return db.get(query, params)
