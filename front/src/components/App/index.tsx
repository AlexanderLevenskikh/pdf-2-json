import React, { FC } from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import 'antd/dist/antd.css';
import styles from './styles.less';
import classNames from "classnames";
import { PdfUploader } from "root/components/PdfUploader";

const { Header, Content, Footer } = Layout;

export const AppComponent: FC = () => {
    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className={ classNames('logo', styles.logo) }>
                    Pdf2Json
                </div>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    <PdfUploader/>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
            </Footer>
        </Layout>
    )
};
