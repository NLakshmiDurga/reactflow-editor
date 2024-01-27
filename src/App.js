import './App.css';
import * as React from 'react';
import 'reactflow/dist/style.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Container, CssBaseline, Divider, Icon, List, ListItemIcon, ListItemText} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ReactFlow, { Background, Controls, useEdgesState, useNodesState,applyNodeChanges, applyEdgeChanges, addEdge, updateEdge } from 'reactflow';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import RightDrawerForm from './RightDrawerForm';
import Creative from './Pages/Creative';
import Creative1 from './Pages/Creative1';
import Creative2 from './Pages/Creative2';
import Creative3 from './Pages/Creative3';
const drawerWidth = 250;
const darkTheme = createTheme({
	palette: {
	  mode: 'dark',
	},
});


const nodeTypes = {
	Creative: Creative,
	Creative1: Creative1,
	Creative2: Creative2,
	Creative3: Creative3,
  };

function App() {
	const initialNodes = [
		{ id: '1', type: 'input',sourcePosition: 'right',targetPosition: 'left', data: { label: 'Input Node' }, position: { x: 50, y: 50 } },
		// you can also pass a React component as a label
		{ id: '2',type:'default',sourcePosition: 'right',targetPosition:'left', data: { label: <div>Another Node</div> }, position: { x: 300, y: 50 } },
	];
	const initialEdges = [{ id: 'e1-2', source: '1', target: '2'}];
	const [nodes, setNodes ] = useNodesState(initialNodes);
	const [edges, setEdges] = useEdgesState(initialEdges);
	const [drawer, setDrawer] = React.useState(false);
	const [clickedNodeId, setClickedNodeId] = React.useState(null);
	//drawer open and close
	const toggleDrawer = (open) => (event) => {
		setDrawer(open);
	  };
	React.useEffect(() => {
		console.log('nodes: ', nodes);
		console.log('edges: ', edges);
	}, [nodes, edges]);

	//Calls when nodes change
	const onNodesChange = React.useCallback(
		(changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[setNodes],
	);
	//calls when edges change
	const onEdgesChange = React.useCallback(
		(changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[setEdges],
	);
	//update edge
	const onEdgeUpdate = React.useCallback(
		(oldEdge, newConnection) => setEdges((els) => updateEdge(oldEdge, newConnection, els)),
		[setEdges]
	);
	const onConnect = React.useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
	//Adding a new node
	const addNewNode = (type) => {
		let nodePositionx;
		let nodePositiony;
		nodes.map((node) => {
			nodePositionx = node.position.x;
			nodePositiony = node.position.y;
		});
		const newNode = {
			id: (nodes.length + 1).toString(),
			type: type, // 'input', 'output' or 'default
			sourcePosition: 'right',
			targetPosition: 'left',
			data: { label: type },
			position: { x: nodePositionx+200, y: nodePositiony },
		};
		setNodes((ns) => [...ns, newNode]);
	}
	return (
		<ThemeProvider theme={darkTheme}>
			<div className="App">
				<header className="App-header">
				</header>
				<CssBaseline />
				<Box sx={{ display: 'flex' }}>
					<Drawer sx={{width: drawerWidth,flexShrink: 0,'& .MuiDrawer-paper': {width: drawerWidth, marginTop:'60px', boxSizing: 'border-box'}}} variant="permanent" anchor="left">
						<Divider />
						<List>
							{['Creative', 'Creative1', 'Creative2', 'Creative3'].map((text, index) => (
							<ListItem key={text} disablePadding>
								<ListItemButton >
								
									<Button className="NodeTypeButton" onClick={() => addNewNode(text)}>
									<ListItemIcon className='ListItemIconStyle'>
										{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
									</ListItemIcon>
								{text}
								</Button>
								</ListItemButton>
								
								<Divider />
							</ListItem>
							))}
						</List>
						
						<Divider />
					</Drawer>
					<Container maxWidth="xl">
						<Box className="BoxStyles" >
						<ReactFlow 
							nodes={nodes}
							edges={edges}
							nodeTypes={nodeTypes}
							onNodesChange={onNodesChange}
							onEdgesChange={onEdgesChange}
							onEdgeUpdate={onEdgeUpdate}
							onConnect={onConnect}
							onNodeClick={(event, node) => {
								setClickedNodeId(node.id);
								toggleDrawer(true)();
							  }}
							fitViewOptions={{minZoom:0.5,maxZoom:0.5}}
						>
							<Controls/>
							<Background gap={16}/>
						</ReactFlow>
							</Box>
					</Container>
				</Box>
				<Box sx={{ display: 'flex' }}>
					<Drawer className='RightDrawer' anchor='right' open={drawer} >
						<RightDrawerForm 
							closeDrawer={toggleDrawer(false)}
							nodes={nodes}
							updateNode={(firstName, lastName, email) => {
								// Update the clicked node with the form values
								if (clickedNodeId) {
									setNodes((nodes) =>
										nodes.map((node) => {
											if (node.id === clickedNodeId) {
												console.log('data label: ', node);
												if(node.type === 'input' || node.type === 'default' || node.type === 'output'){
													return {
														...node,
														data: {
														  ...node.data,
														  label: {
															...node.data.label,
															props: {
															  ...node.data.label.props,
															  children: firstName + ' ' + lastName,
															},
														  },
														},
													};
												}
												else {
													return {
														...node,
														data: {
															...node.data,
															label: firstName + ' ' + lastName,
														},
													};
												}
												
											}
											return node;
										})
									);
								}
								console.log('nodeToUpdate: ', clickedNodeId);
							}}
						/>
					</Drawer>
				</Box>
			</div>
		</ThemeProvider>	
	);
}

export default App;
