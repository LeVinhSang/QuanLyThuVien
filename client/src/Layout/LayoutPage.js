import PropTypes from 'prop-types'
import React from 'react';
import {
    Button, Container, Divider, Grid, Header, Icon, Image, List, Segment
} from 'semantic-ui-react';

import Borrower from '../Borrower/Borrower';
import Book from "../Book/Book";
import MobileContainer from "./MobileContainer";
import DesktopContainer from "./DeskoptopContainer";

const HomepageHeading = ({ mobile }) => (
    <Container text>
        <Header
            as='h1'
            content='Digital  Library'
            inverted
            style={{
                fontSize: mobile ? '2em' : '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: mobile ? '1.5em' : '3em',
            }}
        />
        <Header
            as='h2'
            content='Do whatever you want when you want to.'
            inverted
            style={{
                fontSize: mobile ? '1.5em' : '1.7em',
                fontWeight: 'normal',
                marginTop: mobile ? '0.5em' : '1.5em',
            }}
        />
        <Button primary size='huge'>
            Get Started
            <Icon name='right arrow' />
        </Button>
    </Container>
);

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
};

const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
);

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
};

const HomepageLayout = () => (
    <ResponsiveContainer>
        <Segment style={{ padding: '8em 0em' }} vertical>
            <Grid container stackable>
                <Grid.Row>
                    <Grid.Column width={13}>
                        <Borrower/>
                    </Grid.Column>
                    <Grid.Column floated='right' width={3}>
                        <Book/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column textAlign='center'>
                        <Button size='huge'>Check Them Out</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
        <Segment style={{ padding: '0em' }} vertical>
            <Grid celled='internally' columns='equal' stackable>
                <Grid.Row textAlign='center'>
                    <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                        <Header as='h3' style={{ fontSize: '2em' }}>"What a Digital Library"</Header>
                        <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
                    </Grid.Column>
                    <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                        <Header as='h3' style={{ fontSize: '2em' }}>"You should go to with me."</Header>
                        <p style={{ fontSize: '1.33em' }}>
                            <Image avatar src='https://encrypted-tbn0.gstatic.com/avatar?q=tbn:ANd9GcQJo7JXIedjTYyu7CrNiCSMBvepL1CM5zW2qFTDvc6IGRwBRTeCsQ' />
                            <b>Everything</b> will for you!
                        </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
        <Segment style={{ padding: '8em 0em' }} vertical>
            <Container text>
                <Header as='h3' style={{ fontSize: '2em' }}>Breaking The Grid, Grabs Your Attention</Header>
                <p style={{ fontSize: '1.33em' }}>
                    Instead of focusing on content creation and hard work, we have learned how to master the art of doing
                    nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic
                    and worth your attention.
                </p>
                <Button as='a' size='large'>Read More</Button>
                <Divider
                    as='h4'
                    className='header'
                    horizontal
                    style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                >
                    <a href=''>Case Studies</a>
                </Divider>
                <Header as='h3' style={{ fontSize: '2em' }}>Did We Tell You About Our Bananas?</Header>
                <p style={{ fontSize: '1.33em' }}>
                    Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but it's really
                    true.
                    It took years of gene splicing and combinatory DNA research, but our bananas can really dance.
                </p>
                <Button as='a' size='large'>I'm Still Quite Interested</Button>
            </Container>
        </Segment>
        <Segment inverted vertical style={{ padding: '5em 0em' }}>
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='About' />
                            <List link inverted>
                                <List.Item as='a'>Sitemap</List.Item>
                                <List.Item as='a'>Contact Us</List.Item>
                                <List.Item as='a'>Religious Ceremonies</List.Item>
                                <List.Item as='a'>Gazebo Plans</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='Services' />
                            <List link inverted>
                                <List.Item as='a'>Banana Pre-Order</List.Item>
                                <List.Item as='a'>DNA FAQ</List.Item>
                                <List.Item as='a'>How To Access</List.Item>
                                <List.Item as='a'>Favorite X-Men</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Header as='h4' inverted>Footer Header</Header>
                            <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    </ResponsiveContainer>
);
export default HomepageLayout;