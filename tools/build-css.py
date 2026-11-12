#!/usr/bin/env python3
"""Build style/app.min.css from style/app.css.

Edit style/app.css only, then run:  python3 tools/build-css.py
(This keeps the two files from drifting apart.)
"""
import re, pathlib

root = pathlib.Path(__file__).resolve().parent.parent
src = (root / "style" / "app.css").read_text(encoding="utf-8")

css = re.sub(r"/\*.*?\*/", "", src, flags=re.S)      # comments
css = re.sub(r"\s+", " ", css)                         # whitespace runs
css = re.sub(r"\s*([{};,])\s*", r"\1", css)            # around { } ; ,
css = re.sub(r":\s+", ":", css)                        # after ':'
css = re.sub(r";}", "}", css)                          # last ';' in a block
css = css.replace("}", "}\n").strip() + "\n"           # one rule per line

(root / "style" / "app.min.css").write_text(css, encoding="utf-8")
print(f"style/app.min.css written: {len(src)} -> {len(css)} bytes")
