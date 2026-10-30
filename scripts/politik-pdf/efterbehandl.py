import pikepdf, collections, sys
titles={"politik-interessekonflikter":("Forretningsgang for identifikation og håndtering interessekonflikter – TOBA Advice A/S","da"),
        "politik-loen":("Lønpolitik – TOBA Advice A/S","da"),
        "privatlivspolitik":("Data Protection and Privacy Policy – TOBA Advice A/S","en")}
import os
os.chdir(os.path.join(os.path.dirname(__file__), "../../public/dokumenter"))
for f,(title,lang) in titles.items():
    pdf=pikepdf.open(f+".pdf", allow_overwriting_input=True); root=pdf.Root
    root.Lang=pikepdf.String(lang)
    vp=root.get("/ViewerPreferences", pikepdf.Dictionary()); vp.DisplayDocTitle=True; root.ViewerPreferences=vp
    pdf.docinfo["/Title"]=pikepdf.String(title); pdf.docinfo["/Author"]=pikepdf.String("TOBA Advice A/S")
    with pdf.open_metadata(set_pikepdf_as_editor=False) as m:
        m["dc:title"]=title; m["dc:language"]=[lang]; m["dc:creator"]=["TOBA Advice A/S"]
    # untagged drawing ops (text/images/paths) outside marked content
    untagged=collections.Counter(); 
    for i,page in enumerate(pdf.pages):
        depth=0; stack=[]
        for operands,op in pikepdf.parse_content_stream(page):
            o=str(op)
            if o in ("BDC","BMC"): stack.append(str(operands[0]))
            elif o=="EMC": stack and stack.pop()
            elif o in ("Tj","TJ","'",'"',"Do","f","f*","S","B","b","sh") and not stack:
                untagged[o]+=1
    figs=[]
    def walk(n,d=0):
        if d>80 or not isinstance(n,pikepdf.Dictionary): return
        if n.get("/S")=="/Figure": figs.append(str(n.get("/Alt")))
        k=n.get("/K")
        if isinstance(k,pikepdf.Array):
            for c in k: walk(c,d+1)
        else: walk(k,d+1)
    walk(root.StructTreeRoot)
    print(f,"| title",pdf.docinfo.Title,"| untagged ops",dict(untagged),"| figures",figs)
    pdf.save(f+".tmp.pdf"); pdf.close()
    import os; os.replace(f+".tmp.pdf", f+".pdf")
