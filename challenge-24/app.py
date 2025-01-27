from flask import Flask, request, render_template
from saxonche import PySaxonProcessor

app = Flask(__name__, static_url_path='/static', static_folder='static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/parse-xslt', methods=['POST'])
def parse_xslt():
    try:
        if 'xslt_file' not in request.files:
            return 'No file part', 400
        
        xslt_file = request.files['xslt_file']
        xslt_content = xslt_file.read()

        with PySaxonProcessor(license=False) as proc:
            xsltproc = proc.new_xslt30_processor()
            xsltproc.set_cwd('.')
            transformer = xsltproc.compile_stylesheet(stylesheet_text=xslt_content.decode())

            with open('./resources/some.xml', 'rb') as xml_file:
                xml_content = xml_file.read()

            document = proc.parse_xml(xml_text=xml_content.decode('utf-8'))
            output = transformer.transform_to_string(xdm_node=document)

            if not output:
                return "Successful but no output"

            return output
    except Exception as e:
        print(f"Error processing XSLT: {str(e)}")
        return str(e), 500
    
if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
