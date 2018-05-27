import React, { Component }             from 'react'
import { Button, Grid, Segment } from 'semantic-ui-react'
import Borrower                         from "../Borrower/Borrower";
import Book                             from "../Book/Book";

export default class User extends Component {


    render() {
        return (
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
        )
    }
}