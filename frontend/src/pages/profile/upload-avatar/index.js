import './style.scss'
import React, {useState} from "react";
import CloseIcon from '../../../img/x.svg'
import {FileImageOutlined, CloseCircleTwoTone } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { Image, Input } from 'antd';

const imageUploadReducer = (state, action) => {
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



const UploadAvatar = ({className, updateFileImg}) => {

    const [image, setImage] = React.useState('')
    const [isUploaded, setIsUploaded] = useState(false)


    const  handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          let reader = new FileReader();
          
          reader.onload = function (e) {
            setImage(e.target.result);
            setIsUploaded(true);
          };
          const oriFile = e.target.file[0];
          updateFileImg(oriFile)
          reader.readAsDataURL(e.target.files[0]);
        }
      }
    return (
        <div className="image-layout">
        <div className="container">
        <div className="box-upload">
          <div className="image-upload">
            {!isUploaded ? (
              <>
                <label htmlFor="upload-input">
                    <FileImageOutlined style={{fontSize: 120, color: '#b5b5b5'}} />
                </label>

                <Input
                  id="upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </>
            ) : (
              <div className="image-preview">
                <CloseCircleTwoTone
                    className = "close-icon" 
                    onClick={() => {
                    setIsUploaded(false);
                    setImage(null);
                  }}
                />
                
                  <Image
                    id="uploaded-image"
                    src={image}
                    draggable={false}
                    alt="uploaded-img"
                  />
              </div>
            )}
          </div>
        </div>
        </div>
        </div>
    )

}

UploadAvatar.protoTypes = {
    // updateFileImg: PropTypes.func.isRequired
} 

export default UploadAvatar