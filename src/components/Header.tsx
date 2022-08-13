import { Alignment, Icon, Navbar, NavbarHeading } from "@blueprintjs/core"

export const Header = () => {
    return (
        <Navbar>
            <Navbar.Group className={"margin-horizontal-spacing"} align={Alignment.LEFT}>
                <Icon icon="git-merge" />
                <NavbarHeading>Merge</NavbarHeading>
            </Navbar.Group>
            <Navbar.Group className={"margin-horizontal-spacing"} align={Alignment.RIGHT}>
            </Navbar.Group>
        </Navbar>
    )
}