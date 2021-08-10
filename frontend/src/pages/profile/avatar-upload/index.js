import './style.scss'

import React from 'react'
import { Upload, Image } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { getBase64 } from '../../../utils/image'
import Avatar from 'antd/lib/avatar/avatar'
import Modal from 'antd/lib/modal/Modal'

const imageUploadReducer = (state, action) => {
	switch (action.type) {
		case 'choose_preview':
			return {
				...state,
				previewSrc: action.file.url || action.file.preview,
				previewUid: action.file.uid,
				// previewImage: action.file.url || action.file.preview,
		  		previewVisible: true,
			}

		case 'cancle_modal':
			return {
				...state,
				previewVisible:false,
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
	updateFileImg,
	updateMainIndex,
	clear,
	resetClear
}) => {
	const [state, dispatch] = React.useReducer(imageUploadReducer, {
		previewVisible: false,
		previewSrc: '',
		previewUid: '',
		fileList: []
	})

	const [isUploaded, setIsUploaded] = React.useState(false)

	React.useEffect(() => {
		if (clear) {
			dispatch({ type: 'reset' })
			resetClear()
		}
	}, [clear, resetClear])

	const { previewVisible, previewSrc, previewUid, fileList } = state

	
	const handlePreview = async file => {
		if (!file.url && !file.preview) {
		  file.preview = await getBase64(file.originFileObj);
		}
	
		updateMainIndex(fileList.findIndex(f => f.uid === file.uid))
		dispatch({ type: 'choose_preview', file })
	  };

	const handleCancle = () => {
		dispatch({type: 'cancle_modal'})
	}
	 
	const handleChange = ({ fileList }) => {
		const oriFileList = fileList.map(file => file.originFileObj)
		updateFileImg(oriFileList)
		setIsUploaded(true)
		dispatch({ type: 'add_image', fileList })
	}

	const handleRemove = file => {
		if (file.uid === previewUid) {
			updateMainIndex(0)
			dispatch({ type: 'remove_preview' })
			// setIsUploaded(false);
		}
	}

	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess('ok')
		}, 0)
	}

	return (
		<div className={className}>
			<Upload
				className={`img-upload__list${
					fileList.length >= 1
						? ' img-upload__list--full'
						: fileList.length === 0
						? ' img-upload__list--empty'
						: ''
				}`}
				accept="image/*"
				listType="picture-card"
				fileList={fileList}
				onRemove={handleRemove}
				onPreview={handlePreview}
				onChange={handleChange}
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
				visible={previewVisible}
				onCancel={handleCancle}>
					<img src={previewSrc} />
			</Modal>
		</div>
	)
}

AvatarUpload.propTypes = {
	updateFileImg: PropTypes.func.isRequired,
	updateMainIndex: PropTypes.func.isRequired,
	clear: PropTypes.bool.isRequired
}

export default AvatarUpload
