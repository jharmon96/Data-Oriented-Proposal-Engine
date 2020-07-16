def Accuracy(i):
    switcher={
        "SBA":"99.15%",
        "8AN":"95.83%",
        "8A":"96.76%",
        "SDVOSBC":"92.68%",
        "HZC":"95.49%",
        "WOSB":"90.14%",
    }
    return switcher.get(i,"")
def Precision(i):
    switcher={
        "SBA":"92.2%",
        "8AN":"85.4%",
        "8A":"89.2%",
        "SDVOSBC":"85.4%",
        "HZC":"88.1%",
        "WOSB":"68.4%",
    }
    return switcher.get(i,"")
def Recall(i):
    switcher={
        "SBA":"95.9%",
        "8AN":"82.3%",
        "8A":"86.2%",
        "SDVOSBC":"69.3%",
        "HZC":"76.8%",
        "WOSB":"63.2",
    }
    return switcher.get(i,"")
def F1(i):
    switcher={
        "SBA":"94.0%",
        "8AN":"83.8%",
        "8A":"87.7%",
        "SDVOSBC":"76.5%",
        "HZC":"82.1%",
        "WOSB":"65.7%",
    }
    return switcher.get(i,"")