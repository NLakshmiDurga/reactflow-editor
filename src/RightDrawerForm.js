import React, { useEffect } from 'react';
import { FormControl, InputLabel, Input, Button, TextField, Box, Grid } from '@mui/material';
import { Label } from '@mui/icons-material';

export default function RightDrawerForm(props) {
	const [firstName, setFirstName] = React.useState('');
	const [lastName, setLastName] = React.useState('');
	const [email, setEmail] = React.useState('');
	useEffect(() => {
		const node = props.nodes.find((node) => node.id === props.clickedNodeId);
		if (node) {
		  setFirstName(node.data.label.props.children);
		  setLastName(node.data.label.props.children);
		  setEmail(node.data.label.props.children);
		}
	  }, [props.clickedNodeId, props.nodes]);
	return (
		<Box sx={{ flexGrow: 1, padding:'15%' }}>
			<Grid container spacing={2} columns={1}>
				<Grid item xs={12}>
					<FormControl>
					<TextField
						id="firstName"
						label="First Name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl>
					<TextField
						id="lastName"
						label="Last Name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl>
					<TextField
						id="email"
						label="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" color="primary" type="Cancel" onClick={props.closeDrawer}>
						Cancel
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Button
					variant="contained"
					color="primary"
					type="submit"
					onClick={() => {
						props.updateNode(firstName, lastName, email);
						props.closeDrawer();
					}}
					>
						Submit
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}