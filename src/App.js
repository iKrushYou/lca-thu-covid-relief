import React, {useEffect, useMemo, useState} from "react";
import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import LCALogo from './LMBD-Logo-Primary-Horiz-RGB.png'
import Papa from 'papaparse'
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import BathroomBefore from './room7-bathroom-before.jpg'
import BathroomAfter from './room7-bathroom-after.jpg'

const donationTiers = [
    {
        label: 'Gold',
        min: 300,
        max: Number.MAX_SAFE_INTEGER,
        details: '$300+',
        color: '#FFD133',
    },
    {
        label: 'Green',
        min: 100,
        max: 300,
        details: '$100 - $299+',
        color: '#046B37',
    },
    {
        label: 'Purple',
        min: 50,
        max: 100,
        details: '$50 - $99',
        color: '#5E266D',
    },
    {
        label: 'Brotherhood',
        min: 0,
        max: 50,
        details: '$1 - $49',
    },
]

function App() {

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([]);

    useEffect(() => {
        setIsLoading(true)
        Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vQrPfNv6akguFIv2o6zgOTwEY4gD20F8Ymmm2hM9N-EMP86owgO3wUv4gm-6OZAZkJ81cPoKQ1vUbs6/pub?gid=1629396699&single=true&output=csv', {
            download: true,
            header: true,
            complete: ({data}) => {
                setData(
                    data.map(row => ({
                        ...row,
                        name: row.Name,
                        zeta: row.Zeta,
                        amount: parseFloat(row.Amount.replace('$', ''))
                    }))
                )
                setIsLoading(false)
            }
        })
    }, []);

    const range = useMemo(() => {
        let min = Number.MAX_SAFE_INTEGER;
        let max = Number.MIN_SAFE_INTEGER;
        for (const datum of data) {
            min = Math.min(min, datum.amount)
            max = Math.max(max, datum.amount)
        }
        return {min, max}
    }, [data])

    console.log({range})

    const totalAmount = data?.reduce((previousValue, currentValue) => previousValue + currentValue.amount, 0)

    const [showLetter, setShowLetter] = useState(false)

    return (
        <>
            <div style={{margin: 20}}>
                <CssBaseline/>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img src={LCALogo} style={{width: '100%', maxWidth: 1000}} alt={"lca logo"}/>
                    <Typography variant={'h3'}>Theta Upsilon Zeta</Typography>
                    <Typography variant={'h2'}>COVID-19 Relief Fund</Typography>
                    <Button color={'primary'} onClick={() => setShowLetter(true)}>Letter From House Corp</Button>
                    <Typography variant={'h1'}>
                        {isLoading ? (
                            <CircularProgress size={48}/>
                        ) : (
                            `$${totalAmount}`
                        )}
                    </Typography>
                </div>
                <Typography variant={'h4'} gutterBottom>Donors</Typography>
                {isLoading ? (
                    <LinearProgress style={{marginTop: 20}}/>
                ) : (
                    <Grid container spacing={2}>
                        {donationTiers
                            .filter(tier => tier.min >= range.min)
                            .map(({label, min, max, details, color}) => (
                            <Grid item xs={12} md={4}>
                                <Card style={{height: '100%'}}>
                                    <CardContent>
                                        <div style={{display: 'flex', alignItems: 'baseline'}}>
                                                <Typography variant={'h4'} style={{color, flex: 1}}>{label}</Typography>
                                                <Typography color={'textSecondary'} style={{marginBottom: 5}}>({details})</Typography>
                                        </div>
                                        {data
                                            ?.filter(donation => donation.amount < max && donation.amount >= min)
                                            .sort((a, b) => b.amount - a.amount)
                                            .map(({name, zeta, amount}) => (
                                                <Typography>{name} {zeta ? `(${zeta})` : ''} - ${amount}</Typography>
                                            ))}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>)}
            </div>
            <Dialog
                open={showLetter}
                onClose={() => setShowLetter(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth={'lg'}
            >
                <DialogTitle id="alert-dialog-title">{"A Letter from House Corp"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p>Dear Alumni of Lambda Chi Alpha, Theta Upsilon Zeta,</p>
                        <p>Hello! My name is James Beck and I am the House Corp Director of Communication. With 2020
                            behind
                            us and 2021 well underway, House Corporation has held our first quarterly open meeting.
                            There,
                            we laid out of plans for 2021, and discussed the state of the House & the active
                            chapter.</p>
                        <p>The main issue we discussed is the issue of the active chapter's current deficit: As of
                            writing
                            this email, the active chapter has a deficit of approximately $18,000 due to the toll that
                            Covid-19 has placed on the active chapter's finances, mostly due to NYU transitioning to
                            remote
                            learning and thus the chapter being unable to fill the House during the pandemic.</p>
                        <p>Although the chapter is not at risk of losing the house as a result of this deficit, it does
                            mean
                            that House Corporation has been forced to slash our maintenance and improvement budgets as a
                            result.</p>
                        <p>In 2020, we at House Corp renovated four out of the seven bathrooms within the fraternity
                            house,
                            replacing the leaky showers and rotting wood floors entirely. Attached are before and after
                            photos of the notorious Room 7 bathroom to show you the progress that has been made thus
                            far.
                            The original plan was for House Corporation to finish what we started and renovate the
                            remaining
                            three bathrooms and their associated plumbing. However, due to the deficit, this much needed
                            work may be delayed until 2022.</p>
                        <p>In order to address this and to continue to provide the actives with an enjoyable and safe
                            fraternity
                            experience, House Corporation is working alongside the active chapter to raise funds to help
                            the
                            active chapter combat this deficit. Every dollar donated will not only help the active
                            chapter pay
                            back their deficit to House Corporation, but it will also go directly into the maintenance
                            and
                            improvement budget, helping fix and renovate the house that many of us hold dear and have
                            fond
                            memories of.</p>
                        <p>In order to further incentivize donations, we are working with the active chapter to dedicate
                            a
                            plaque to all donors that donate.</p>
                        <p>
                            <ul>

                                <li>$50 - $99: Purple Level Donor</li>
                                <li>$100 - $299: Green Level Donor</li>
                                <li>$300 and up: Gold Level Donor</li>
                            </ul>
                        </p>
                        <p>We will be accepting donations until April 10. If you would like to make a donation. If you
                            are feeling generous, please donate by doing the following:</p>
                        <p>By Venmo: Please include the memo "House Corp Donation" and send it to "Alex-Lawson-6"</p>
                        <p>By PayPal: Please use the "family & friends" option to avoid extraneous fees, include the
                            memo "House Corp Donation", and send it to "alexlawson1@live.com"</p>
                        <p>By cash or check: Please write any checks to "Theta Upsilon House Corporation" and mail it to
                            "442 Old Town Way, Hanover, MA 02339"</p>
                        <p>I look forward to seeing you all at the next alumni event post Covid-19.</p>
                        <p>In ZAX,<br/>
                            James Beck<br/>
                            ThU 969<br/>
                            House Corp Chair of Membership</p>

                    </DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <img src={BathroomBefore} alt={'Room 7 Bathroom - Before'} style={{width: '100%'}}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <img src={BathroomAfter} alt={'Room 7 Bathroom - After'} style={{width: '100%'}}/>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>


    )
        ;
}

export default App;

