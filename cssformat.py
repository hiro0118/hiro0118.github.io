originalfile = open("css/stylish-portfolio.min.css", 'r')
cssdataline = originalfile.read()
originalfile.close()


cssformats = cssdataline.split("}.")
newfile = open("css/stylish-portfolio.min-fixed.css", 'w')
for cssformat in cssformats:
    newfile.write('.' + cssformat + '}\n')
newfile.close()

print('done')