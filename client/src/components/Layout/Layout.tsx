import { ReactNode, FunctionComponent, Fragment } from "react";
import { Container } from "reactstrap";
import { Header } from "./Header";

interface Props {
    children: ReactNode;
}

export const Layout: FunctionComponent<Props> = ({ children }: Props) => {
    return (
        <Fragment>
            <Header />
            <div className="body-container">
                <Container className="main-container">{children}</Container>
            </div>
        </Fragment>
    );
};
