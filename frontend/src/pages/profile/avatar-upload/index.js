import './style.scss'

import React, {useState} from 'react'
import { Upload, Image, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'


const imageUploadAvatar = (state, action) => {
	switch (action.type) {
		case 'choose_preview':
			return {
				...state,
				previewSrc: action.file.url || action.file.preview,
				previewUid: action.file.uid
			}
		case 'remove_preview':
			return { ...state, previewSrc: '', previewUid: '' }
		case 'add_image':
			return { ...state, fileList: action.fileList }
		case 'reset':
			return { previewSrc: '', previewUid: '', fileList: [] }
		default:
			throw new Error('Impossible!')
	}
}


const AvatarUpload = ({
	className,
	updateFileList,
	// updateMainIndex,
	clear,
	resetClear
}) => {
	// const [state, dispatch] = React.useReducer(imageUploadAvatar, {
	// 	previewSrc: '',
	// 	previewUid: '',
	// 	fileList: []
	// })

	const [state, setState] = useState({
		previewVisible: false,
		previewImage: "",
		fileList: []
	})

	// React.useEffect(() => {
	// 	if (clear) {
	// 		dispatch({ type: 'reset' })
	// 		resetClear()
	// 	}
	// }, [clear, resetClear])

	const { previewSrc, previewUid, fileList } = state

	const handleCancel = () => setState({previewVisible:false});

	const handlePreview = file => {
		setState({
			previewImage: file.thumbUrl,
      		previewVisible: true
		})
	} 

	const handleUpload = ({fileList}) => {
		setState({fileList});
	}

	// const handleChange = ({ fileList }) => {
	// 	const oriFileList = fileList.map(file => file.originFileObj)
	// 	updateFileList(oriFileList)

	// 	dispatch({ type: 'add_image', fileList })
	// }
	

	// const handleRemove = file => {
	// 	if (file.uid === previewUid) {
	// 		// updateMainIndex(0)
	// 		dispatch({ type: 'remove_preview' })
	// 	}
	// }

	// const handleCancle = () => {
		
	// }

	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess('ok')
		}, 0)
	}

	return (
		<div className={className}>
			
				<Upload
					// className={`img-upload__list${
					// 	fileList.length >= 1
					// 		? ' img-upload__list--full'
					// 		: fileList.length === 0
					// 		? ' img-upload__list--empty'
					// 		: ''
					// }`}
					accept="image/*"
					listType="picture-card"
					fileList={fileList}
					onPreview={handlePreview}
					onChange={handleUpload}
					beforeUpload={() => false}
					customRequest={dummyRequest}
				>
				{fileList.length >= 1 ? null : (
					<div>
						<PlusOutlined />
						<div style={{ marginTop: 8 }}>Thêm ảnh</div>
					</div>
				)}
			</Upload>
			<Modal
				visible={state.previewVisible}
				footer={null}
				onCancel={handleCancel}
				>
				<Image alt="example" style={{ width: "100%" }} src={state.previewImage} />
			</Modal>
			
		</div>
	)
}

AvatarUpload.propTypes = {
	// updateFileList: PropTypes.func.isRequired,
	// updateMainIndex: PropTypes.func.isRequired,
	// clear: PropTypes.bool.isRequired
}

export default AvatarUpload
