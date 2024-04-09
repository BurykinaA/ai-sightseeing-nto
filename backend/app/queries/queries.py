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
