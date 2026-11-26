import ast

for fn in ['main.py', 'schemas.py']:
    try:
        ast.parse(open(fn).read())
        print(f"{fn}: OK")
    except SyntaxError as e:
        print(f"{fn}: SYNTAX ERROR - {e}")
