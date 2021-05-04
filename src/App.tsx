import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Card, CardContent, Grid, TableBody, TableHead, TableRow, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import LCALogo from './LMBD-Logo-Primary-Horiz-RGB.png';
import Papa from 'papaparse';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import BathroomBefore from './room7-bathroom-before.jpg';
import BathroomAfter from './room7-bathroom-after.jpg';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import { format } from 'date-fns';

const DONATION_GOAL = 18000;

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
];

interface TimeLeft {
  years: number;
  days: number;
  hours: number;
  min: number;
  sec: number;
}

function calculateCountdown(endDate: Date): TimeLeft | null {
  let diff = (Date.parse(String(new Date(endDate))) - Date.parse(String(new Date()))) / 1000;

  // clear countdown when date is reached
  if (diff <= 0) return null;

  const timeLeft = {
    years: 0,
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
    millisec: 0,
  };

  // calculate time difference between now and expected date
  if (diff >= 365.25 * 86400) {
    // 365.25 * 24 * 60 * 60
    timeLeft.years = Math.floor(diff / (365.25 * 86400));
    diff -= timeLeft.years * 365.25 * 86400;
  }
  if (diff >= 86400) {
    // 24 * 60 * 60
    timeLeft.days = Math.floor(diff / 86400);
    diff -= timeLeft.days * 86400;
  }
  if (diff >= 3600) {
    // 60 * 60
    timeLeft.hours = Math.floor(diff / 3600);
    diff -= timeLeft.hours * 3600;
  }
  if (diff >= 60) {
    timeLeft.min = Math.floor(diff / 60);
    diff -= timeLeft.min * 60;
  }
  timeLeft.sec = diff;

  return timeLeft;
}

function formatMoney(number: number) {
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function formatPct(decimal: number) {
  return parseFloat(String(decimal * 100.0)).toFixed(2) + '%';
}

interface Donation {
  name: string;
  zeta: string;
  amount: number;
  displayAmount: boolean;
  date: Date;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [donationsData, setData] = useState<Donation[]>([]);

  useEffect(() => {
    setIsLoading(true);
    Papa.parse(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vQrPfNv6akguFIv2o6zgOTwEY4gD20F8Ymmm2hM9N-EMP86owgO3wUv4gm-6OZAZkJ81cPoKQ1vUbs6/pub?gid=1629396699&single=true&output=csv',
      {
        download: true,
        header: true,
        complete: ({ data }) => {
          setData(
            data.map((row: any) => ({
              name: row.Name,
              zeta: row.Zeta,
              amount: parseFloat(row.Amount.replace('$', '')),
              displayAmount: Boolean(row.displayAmount),
              date: new Date(row.Date),
            }))
          );
          setIsLoading(false);
        },
      }
    );
  }, []);

  const range = useMemo(() => {
    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;
    for (const donation of donationsData) {
      min = Math.min(min, donation.amount);
      max = Math.max(max, donation.amount);
    }
    return { min, max };
  }, [donationsData]);

  console.log({ range });

  const goalAmount = 18000;
  const totalAmount = donationsData?.reduce((previousValue, currentValue) => previousValue + currentValue.amount, 0);

  const [showLetter, setShowLetter] = useState(false);
  const [showDonateDialog, setShowDonateDialog] = useState(false);

  const progressPct = totalAmount / goalAmount;

  const [showMailingInfo, setShowMailingInfo] = useState(false);

  const [showByTier, setShowByTier] = useState(true);

  return (
    <>
      <div style={{ margin: 20 }}>
        <CssBaseline />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={LCALogo} style={{ width: '100%', maxWidth: 1000 }} alt={'lca logo'} />
          <Typography variant={'h3'}>Theta Upsilon Zeta</Typography>
          <Typography variant={'h2'}>COVID-19 Relief Fund</Typography>
          <Button
            color={'primary'}
            variant={'outlined'}
            onClick={() => setShowLetter(true)}
            style={{ marginBottom: 15 }}
          >
            Letter From House Corp
          </Button>
          <Button
            color={'primary'}
            variant={'contained'}
            style={{ fontSize: 40, marginBottom: 20 }}
            onClick={() => setShowDonateDialog(true)}
          >
            Donate Now
          </Button>
          <Card style={{ marginBottom: 20, paddingLeft: 30, paddingRight: 30 }}>
            <CardContent>
              <Typography variant={'h4'}>
                <b>Time Left</b>
              </Typography>
              <CountdownText targetDate={new Date('2021-05-02')} />
            </CardContent>
          </Card>
          {isLoading ? (
            <CircularProgress size={48} />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant={'h1'}>{formatMoney(totalAmount)}</Typography>
              <Typography>Raised of {formatMoney(goalAmount)}</Typography>
              <Typography>Total Donors: {donationsData?.length}</Typography>
              {/*<div style={{width: '100%'}}>*/}
              <Tooltip title={formatPct(progressPct)}>
                <BorderLinearProgress
                  variant="determinate"
                  value={(totalAmount / DONATION_GOAL) * 100.0}
                  style={{ width: '100%', marginTop: 20, marginBottom: 10 }}
                />
              </Tooltip>
              {/*</div>*/}
              {/*    <Typography>{formatPct(progressPct)} to {formatMoney(goalAmount)}</Typography>*/}
            </div>
          )}
        </div>
        <Typography variant={'h4'} gutterBottom>
          Donors <Button onClick={() => setShowByTier((prev) => !prev)}>Show By {showByTier ? 'Date' : 'Tier'}</Button>
        </Typography>
        {isLoading ? (
          <LinearProgress style={{ marginTop: 20 }} />
        ) : (
          <>
            {showByTier ? (
              <DonorListTiers donations={donationsData} range={range} />
            ) : (
              <DonationListTime donations={donationsData} />
            )}
          </>
        )}
      </div>
      <LetterDialog showLetter={showLetter} onClose={() => setShowLetter(false)} />
      <Dialog
        open={showDonateDialog}
        onClose={() => setShowDonateDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">Donate</DialogTitle>
        <DialogContent style={{ padding: 20 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <a
                style={{ textDecoration: 'none' }}
                href={
                  'https://www.paypal.com/donate?business=alexlawson1%40live.com&item_name=Theta+Upsilon+Covid+Relief&currency_code=USD'
                }
                target={'_blank'}
                rel={'noreferrer'}
              >
                <Button variant={'contained'} fullWidth>
                  Paypal
                </Button>
              </a>
            </Grid>
            <Grid item xs={12} md={4}>
              <a
                style={{ textDecoration: 'none' }}
                href={'https://venmo.com/Alex-Lawson-6'}
                target={'_blank'}
                rel={'noreferrer'}
              >
                <Button variant={'contained'} fullWidth>
                  Venmo
                </Button>
              </a>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button variant={'contained'} fullWidth onClick={() => setShowMailingInfo((prev) => !prev)}>
                Cash / Check
              </Button>
            </Grid>
          </Grid>
          <Collapse in={showMailingInfo}>
            <div style={{ height: 30 }} />
            <Typography variant={'h4'}>Mailing Information</Typography>
            <Typography variant={'caption'}>Please send cash / checks to:</Typography>
            <div style={{ height: 10 }} />
            <Typography>Theta Upsilon House Corporation</Typography>
            <Typography>442 Old Town Way</Typography>
            <Typography>Hanover, MA 02339</Typography>
          </Collapse>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;

const CountdownText: FunctionComponent<{ targetDate: Date }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null | undefined>(undefined);

  useEffect(() => {
    updateCountdown();

    const interval = setInterval(() => {
      updateCountdown();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function updateCountdown() {
    const timeLeft = calculateCountdown(targetDate);

    setTimeLeft(timeLeft);
  }

  return (
    <Grid container spacing={4}>
      <Grid
        item
        xs={3}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant={'h3'}>{timeLeft?.days}</Typography>
        <Typography>Days</Typography>
      </Grid>
      <Grid
        item
        xs={3}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant={'h3'}>{timeLeft?.hours}</Typography>
        <Typography>Hours</Typography>
      </Grid>
      <Grid
        item
        xs={3}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant={'h3'}>{timeLeft?.min}</Typography>
        <Typography>Minutes</Typography>
      </Grid>
      <Grid
        item
        xs={3}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant={'h3'}>{timeLeft?.sec}</Typography>
        <Typography>Seconds</Typography>
      </Grid>
    </Grid>
  );
};

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const LetterDialog: FunctionComponent<{ showLetter: boolean; onClose: () => void }> = ({ showLetter, onClose }) => {
  return (
    <Dialog
      open={showLetter}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth={'lg'}
    >
      <DialogTitle id="alert-dialog-title">{'A Letter from House Corp'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <p>Dear Alumni of Lambda Chi Alpha, Theta Upsilon Zeta,</p>
          <p>
            Hello! My name is James Beck and I am the House Corp Director of Communication. With 2020 behind us and 2021
            well underway, House Corporation has held our first quarterly open meeting. There, we laid out of plans for
            2021, and discussed the state of the House & the active chapter.
          </p>
          <p>
            The main issue we discussed is the issue of the active chapter's current deficit: As of writing this email,
            the active chapter has a deficit of approximately $18,000 due to the toll that Covid-19 has placed on the
            active chapter's finances, mostly due to NYU transitioning to remote learning and thus the chapter being
            unable to fill the House during the pandemic.
          </p>
          <p>
            Although the chapter is not at risk of losing the house as a result of this deficit, it does mean that House
            Corporation has been forced to slash our maintenance and improvement budgets as a result.
          </p>
          <p>
            In 2020, we at House Corp renovated four out of the seven bathrooms within the fraternity house, replacing
            the leaky showers and rotting wood floors entirely. Attached are before and after photos of the notorious
            Room 7 bathroom to show you the progress that has been made thus far. The original plan was for House
            Corporation to finish what we started and renovate the remaining three bathrooms and their associated
            plumbing. However, due to the deficit, this much needed work may be delayed until 2022.
          </p>
          <p>
            In order to address this and to continue to provide the actives with an enjoyable and safe fraternity
            experience, House Corporation is working alongside the active chapter to raise funds to help the active
            chapter combat this deficit. Every dollar donated will not only help the active chapter pay back their
            deficit to House Corporation, but it will also go directly into the maintenance and improvement budget,
            helping fix and renovate the house that many of us hold dear and have fond memories of.
          </p>
          <p>
            In order to further incentivize donations, we are working with the active chapter to dedicate a plaque to
            all donors that donate.
          </p>
          <p>
            <ul>
              <li>$50 - $99: Purple Level Donor</li>
              <li>$100 - $299: Green Level Donor</li>
              <li>$300 and up: Gold Level Donor</li>
            </ul>
          </p>
          <p>
            We will be accepting donations until April 10. If you would like to make a donation. If you are feeling
            generous, please donate by doing the following:
          </p>
          <p>By Venmo: Please include the memo "House Corp Donation" and send it to "Alex-Lawson-6"</p>
          <p>
            By PayPal: Please use the "family & friends" option to avoid extraneous fees, include the memo "House Corp
            Donation", and send it to "alexlawson1@live.com"
          </p>
          <p>
            By cash or check: Please write any checks to "Theta Upsilon House Corporation" and mail it to "442 Old Town
            Way, Hanover, MA 02339"
          </p>
          <p>I look forward to seeing you all at the next alumni event post Covid-19.</p>
          <p>
            In ZAX,
            <br />
            James Beck
            <br />
            ThU 969
            <br />
            House Corp Chair of Membership
          </p>
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img src={BathroomBefore} alt={'Room 7 Bathroom - Before'} style={{ width: '100%' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <img src={BathroomAfter} alt={'Room 7 Bathroom - After'} style={{ width: '100%' }} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const DonorListTiers: FunctionComponent<{ donations: Donation[]; range: any }> = ({ donations, range }) => {
  return (
    <Grid container spacing={2}>
      {donationTiers
        .filter((tier) => tier.min >= range.min)
        .map(({ label, min, max, details, color }) => {
          const tierDonations = donations
            ?.filter((donation) => donation.amount < max && donation.amount >= min)
            .sort((a, b) => b.amount - a.amount);
          return (
            <Grid key={label} item xs={12} md={4}>
              <Card style={{ height: '100%' }}>
                <CardContent>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <Typography variant={'h4'} style={{ color, flex: 1 }}>
                      {label} ({tierDonations?.length})
                    </Typography>
                    <Typography color={'textSecondary'} style={{ marginBottom: 5 }}>
                      ({details})
                    </Typography>
                  </div>
                  {tierDonations.map(({ name, zeta, amount, displayAmount }) => (
                    <div key={name} style={{ display: 'flex' }}>
                      <Typography style={{ flex: 1 }}>
                        {name} {zeta ? `(${zeta})` : ''}
                      </Typography>
                      {displayAmount && <Typography>${amount}</Typography>}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
};

const DonationListTime: FunctionComponent<{ donations: Donation[] }> = ({ donations }) => {
  return (
    <Card style={{ height: '100%' }}>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Zeta</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donations
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map(({ date, name, zeta, amount, displayAmount }) => (
                <TableRow key={name}>
                  <TableCell>{format(date, 'P')}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{zeta}</TableCell>
                  <TableCell>{displayAmount ? `$${amount}` : ''}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
