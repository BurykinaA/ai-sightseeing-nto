import sys
from pathlib import Path

# project_root = Path(__file__).absolute().parent.parent
# assert project_root.is_dir(), f"Project root directory not found: {project_root}"
# sys.path.append(str(project_root))

print(sys.path)

from sqlite3_connection import Sqlite3Connection


if __name__ == "__main__":
    db_connection = Sqlite3Connection()
    db_connection.insert_obj_csv("final_db.csv")
