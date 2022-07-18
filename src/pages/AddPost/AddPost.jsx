import { useState, useRef, useEffect } from "react"
// import CodeEditor from "../../components/CodeEditor/CodeEditor"
import Editor from "react-simple-code-editor"
import { highlight, languages } from "prismjs/components/prism-core";
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

function AddPost(props) {
	const [code, setCode] = useState('')
  const [formData, setFormData] = useState({
		caption: '',
		code: ''
  })
  const [validForm, setValidForm] = useState(false)
  
  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const formElement = useRef()

  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  const handleSubmit = evt => {
    evt.preventDefault()
    props.handleAddPost(formData)
  }
  
	return (
		<>
			<h1>Add Code</h1>
			<form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
				{/* <div className="form-group mb-3">
					<label htmlFor="title-input" className="form-label">
						Title (required)
					</label>
					<input 
						type="text"
						className="form-control"
						id="title-input"
						name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Briefly Describe Code"
						required
					/>
				</div> */}
				<div className="form-group mb-3">
					<label htmlFor="caption-input" className="form-label">
						Caption 
					</label>
					<input 
						type="text"
						className="form-control"
						id="caption-input"
						name="caption"
            value={formData.caption}
            onChange={handleChange}
            placeholder="Explain your code!"
					/>
				</div>
				<div className="form-group mb-4">
					<label htmlFor="code-input" className="form-label">
						Code (required)
					</label>
					{/* <CodeEditor
					code={code}
					handleChange={handleChange}
					value={formData.code}
					name="code"
					// onValueChange={code => setCode(code)}
					/> */}
					<Editor
						value={code}
						code={formData.code}
						name="code"
						onValueChange={code => setCode(code)}
						onChange={handleChange}
						highlight={code => highlight(code, languages.js)}
						padding={10}
						textareaClassName="code-editor"
						preClassName="code-editor-pre"
						style={{
							fontFamily: '"Fira code", "Fira Mono", monospace',
							backgroundColor: "#fdfdfd",
							color: "#333",
							border: "1px solid #ddd",
							borderRadius: "4px",
							fontSize: 16,
						}}
					/>
				</div>
				<div className="d-grid">
					<button
						type="submit"
						className="btn btn-primary btn-fluid"
            disabled={!validForm}
					>
						Add Code
					</button>
				</div>
			</form>
		</>
	)
}

export default AddPost