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
