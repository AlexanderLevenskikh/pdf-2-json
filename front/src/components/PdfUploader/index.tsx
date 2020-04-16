import { FC, useState } from "react";
import Dragger from "antd/es/upload/Dragger";
import { Alert, message, Spin } from "antd";
import React from "react";
import { FilePdfOutlined } from "@ant-design/icons/lib";
import styles from './styles.less';

export const PdfUploader: FC = () => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ json, setJson ] = useState<string | null>(null);

    return (
        <React.Fragment>
            <Spin spinning={ loading }>
                <Dragger
                    name='file'
                    multiple={false}
                    accept=".pdf,application/pdf"
                    method='POST'
                    action='/api/upload'
                    showUploadList={ false }
                    onChange={info => {
                        const { status, response } = info.file;
                        if (status === 'uploading') {
                            setJson(null);
                            setLoading(true);
                        }
                        if (status !== 'uploading') {
                            console.log(info.file, info.fileList);
                        }
                        if (status === 'done') {
                            message.success(`Файл ${info.file.name} успешно загружен.`);
                            setJson(JSON.stringify(response, null, 2));
                            setLoading(false);
                        } else if (status === 'error') {
                            message.error(`Произошла ошибка при загрузке файла ${info.file.name}.`);
                            setJson(null);
                            setLoading(false);
                        }
                    }}
                >
                    <p className="ant-upload-drag-icon">
                        <FilePdfOutlined />
                    </p>
                    <p className="ant-upload-text">Нажмите на область или перетащите файл формата .pdf для загрузки</p>
                </Dragger>
            </Spin>

            { json !== null && (
                <Alert
                    message={ json }
                    className={ styles.alert }
                    type="success"
                />
            )}
        </React.Fragment>
    )
}
