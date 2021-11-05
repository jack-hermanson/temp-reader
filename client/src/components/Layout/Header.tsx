import { FunctionComponent } from "react";
import { Container } from "reactstrap";

export const Header: FunctionComponent = () => {
    return (
        <div className="bg-secondary">
            <Container>
                <h1>Temp Reader</h1>
            </Container>
        </div>
    );
};
