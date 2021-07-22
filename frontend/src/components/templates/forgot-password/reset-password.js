import './style.scss';
import { Router, Link, withTranslation } from '../../../translate/init';
import { Row, Col, Form, Button, Divider, message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import CustomInputField from '../../elements/input';
import PropTypes from "prop-types";
import UserApi from '../../../api/user'
import { STATUS_CODE, RESULT_MESSAGE } from '../../../constants';

const ResetPasswordTemplate = (props) => {

    const initialValues = {
        new_password: '',
        retype_password: '',
    };

    const { t } = props;
    const router = useRouter()

    const rules = {
        password: [
            {
                required: true,
                message: t('requiredField'),
            }
        ],
    };

    const onFinish = async values => { 

        const data = {
            ...values,
            verify_code: props.code,
            email: props.email
        }

        const { new_password, retype_password } = values;

        if (new_password != retype_password) {
            message.error(t('errors.passwordDontMatch'))
        } else {
            let result = await UserApi.resetPassword(data);

            if (result && result.code == STATUS_CODE.success) {
                message.success(t('success.resetPassword'))

                router.push("/login")
            } else {
                if (result && result.message == RESULT_MESSAGE.errors.mailOrCodeIncorrect) {
                    message.error(t('errors.mailOrCodeIncorrect'))
                } else if (result && result.message == RESULT_MESSAGE.errors.mailHasNotBeenSent) {
                    message.error(t('errors.mailHasNotBeenSent'))
                } else if (result && result.message == RESULT_MESSAGE.errors.overNumOfAllowedAttemps) {
                    message.error(t('errors.overNumOfAllowedAttemps'))
                } else if (result && result.message == RESULT_MESSAGE.errors.codeExpired) {
                    message.error(t('errors.codeExpired'))
                } else {
                    message.error(t('errors.resetPassword'))
                }
            }
        }
    };

    const onFinishFailed = () => { };

    return (
        <React.Fragment>
            <Row className="forgot-pasword-page">
                <Col xs={ 24 } lg={ 24 }>
                    <div className="forgot-pasword-content">
                        <Row className='w-100' justify="center">
                            <Col span={ 8 }>
                                <Form
                                    name="forgot-pasword"
                                    initialValues={ initialValues }
                                    onFinish={ onFinish }
                                    onFinishFailed={ onFinishFailed }>
                                        
                                    <div className="form-header">
                                        { t('resetPassword') }
                                    </div>

                                    <Form.Item 
                                        className='m-0' 
                                        name='new_password'
                                        rules={ rules.password }>
                                        <CustomInputField 
                                            placeholder={ t('newPassword.newPassword') } 
                                            customStyle='style#2'
                                            type='password'
                                        />
                                    </Form.Item>

                                    <Form.Item 
                                        className='m-0' 
                                        name='retype_password'
                                        rules={ rules.password }>
                                        <CustomInputField
                                            placeholder={ t('retypePassword') }
                                            customStyle='style#2'
                                            type='password'
                                            
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            name="reset-password"
                                            className="send-button"
                                            htmlType="submit">
                                            { t('resetPassword') }
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

ResetPasswordTemplate.propTypes = {
    t: PropTypes.func.isRequired,
    code: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
}

export default withTranslation('common')(ResetPasswordTemplate);
