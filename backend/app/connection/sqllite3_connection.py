import sqlite3
import csv


class Sqlite3Connection:
    """
    Sqlite3 wrapper class to open, close and access the connection
    """

    path = None
    conn = None

    def __init__(self, path="app/database/sights.db"):
        self.path = path

    def open(self):
        if self.conn is None:
            try:
                self.conn = sqlite3.connect(self.path)
            except sqlite3.Error as e:
                print(e)

    def close(self):
        if self.conn is not None:
            self.conn.close()

    def get(self, query):
        if self.conn is None:
            self.open()

        try:
            cur = self.conn.cursor()
            cur.execute(query)
            result = cur.fetchall()
        except sqlite3.Error as err:
            result = "Error - " + err.args[0]

        self.close()
        return result

    def put(self, query):
        if self.conn is None:
            self.open()

        try:
            cur = self.conn.cursor()
            cur.execute(query)
            row_count = cur.rowcount
            self.conn.commit()
            response = "Done - Rows affected: " + str(row_count)
        except sqlite3.Error as err:
            response = "Error - " + err.args[0]

        self.close()
        return response

    def insert_obj_csv(self, csv_path):
        table = "object"
        if self.conn is None:
            self.open()

        with open(csv_path, mode="r", encoding="utf-8") as file:
            dr = csv.DictReader(file)  # assuming no header
            to_db = [
                (
                    i["id"],
                    i["name"],
                    i["city"],
                    i["lon"],
                    i["lat"],
                    i["rate"],
                    i["description"],
                    i["type"],
                )
                for i in dr
            ]

        try:
            cur = self.conn.cursor()
            cur.executemany(
                f"INSERT INTO {table} (id, name, city, lon, lat, rate, description, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
                to_db,
            )
            self.conn.commit()
            response = "Done - Rows affected: " + str(cur.rowcount)
        except sqlite3.Error as err:
            response = "Error - " + err.args[0]
            print(response)

        self.close()
        return response

    def insert_kind_csv(self, csv_path):
        table = "kind"
        if self.conn is None:
            self.open()

        with open(csv_path, mode="r", encoding="utf-8") as file:
            dr = csv.DictReader(file)  # assuming no header
            to_db = [(i["id"], i["type"]) for i in dr]

        try:
            cur = self.conn.cursor()
            cur.executemany(f"INSERT INTO {table} (id, type) VALUES (?, ?);", to_db)
            self.conn.commit()
            response = "Done - Rows affected: " + str(cur.rowcount)
        except sqlite3.Error as err:
            response = "Error - " + err.args[0]

        self.close()
        return response

    def insert_photo_obj_csv(self, csv_path):
        table = "photo_obj"
        if self.conn is None:
            self.open()

        csv.field_size_limit(2**30)

        with open(csv_path, mode="r", encoding="utf-8") as file:
            dr = csv.DictReader(file)  # assuming no header
            to_db = [(i["id_obj"], i["base64"]) for i in dr]

        try:
            cur = self.conn.cursor()
            cur.executemany(
                f"INSERT INTO {table} (id_obj, base64) VALUES (?, ?);", to_db
            )
            self.conn.commit()
            response = "Done - Rows affected: " + str(cur.rowcount)
        except sqlite3.Error as err:
            response = "Error - " + err.args[0]
            print("Error - " + err.args[0])

        self.close()
        return response

    def insert_obj_kind_csv(self, csv_path):
        table = "obj_kind"
        if self.conn is None:
            self.open()

        with open(csv_path, mode="r", encoding="utf-8") as file:
            dr = csv.DictReader(file)  # assuming no header
            to_db = [(i["id"], i["id_kind"], i["id_obj"]) for i in dr]

        try:
            cur = self.conn.cursor()
            cur.executemany(
                f"INSERT INTO {table} (id, id_kind, id_obj) VALUES (?, ?, ?);", to_db
            )
            self.conn.commit()
            response = "Done - Rows affected: " + str(cur.rowcount)
            print("Done - Rows affected: " + str(cur.rowcount))
        except sqlite3.Error as err:
            response = "Error - " + err.args[0]
            print("Error - " + err.args[0])

        self.close()
        return response


def sqlite3_call(database, query):
    """
    Differentiate between SELECT and INSERT, UPDATE, DELETE
    (hack -> wont work with sub-selects in e.g. update)
    """
    if query == "" or query is None:
        return "Warning: Empty query string!"
    elif query and query.lower().find("select") >= 0:
        return database.get(query)
    else:
        return database.put(query)


# if __name__ == '__main__':
#     db_connection = Sqlite3Connection(r'D:\ai-sightseeing-nto\backend\app\database\sights.db')
#     db_connection.insert_obj_csv('final_db.csv')
#     #db_connection.insert_kind_csv('kind_db.csv')
#     #db_connection.insert_photo_csv('photo_db.csv')
#     #db_connection.insert_obj_photo_csv('obj_photo_db.csv')
#     # db_connection.insert_photo_obj_csv('photo_obj_db.csv')
