import sys

def process_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()
    
    parts = html.split('<section class="content-grid">')
    if len(parts) != 3:
        print(f'Warning: {filename} does not have exactly 2 content grids.')
        return
        
    before = parts[0]
    grid1 = parts[1]
    grid2 = parts[2]
    
    # Extract panels from grid1
    p1_start = grid1.find('<article class="panel">')
    if p1_start == -1: p1_start = grid1.find('<aside class="panel">')
    
    p2_start = grid1.find('<article class="panel">', p1_start + 1)
    if p2_start == -1: p2_start = grid1.find('<aside class="panel">', p1_start + 1)
    
    p1 = grid1[p1_start:p2_start].strip()
    
    p2_end = grid1.find('</section>', p2_start)
    p2 = grid1[p2_start:p2_end].strip()
    
    # Extract panels from grid2
    grid2_inner, after = grid2.split('</section>', 1)
    
    p3_start = grid2_inner.find('<article class="panel">')
    if p3_start == -1: p3_start = grid2_inner.find('<aside class="panel">')
        
    p4_start = grid2_inner.find('<article class="panel">', p3_start + 1)
    if p4_start == -1: p4_start = grid2_inner.find('<aside class="panel">', p3_start + 1)
    
    p3 = grid2_inner[p3_start:p4_start].strip()
    p4 = grid2_inner[p4_start:].strip()

    # Add order styles
    p1 = p1.replace('class="panel"', 'class="panel" style="order: 1"')
    p2 = p2.replace('class="panel"', 'class="panel" style="order: 2"')
    p3 = p3.replace('class="panel"', 'class="panel" style="order: 3"')
    p4 = p4.replace('class="panel"', 'class="panel" style="order: 4"')
    
    new_html = before + '<section class="content-grid stacked-cols">\n  <div class="grid-col left-col">\n    ' + p1 + '\n    ' + p3 + '\n  </div>\n  <div class="grid-col right-col">\n    ' + p2 + '\n    ' + p4 + '\n  </div>\n</section>' + after
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_html)
    print(f'Successfully updated {filename}')

files = [
    'it-recruitment.html',
    'staffing-solutions.html',
    'hr-outsourcing.html',
    'recruitment-process-outsourcing.html'
]
for f in files:
    try:
        process_file(f)
    except Exception as e:
        print(f'Error processing {f}: {e}')
