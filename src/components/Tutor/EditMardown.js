

import React , {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
//icons
import CodeIcon from '@mui/icons-material/Code';
import PreviewIcon from '@mui/icons-material/Preview';
import FlipIcon from '@mui/icons-material/Flip';
//Grid component
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
//textField
import TextField from '@mui/material/TextField';
//component markdown
import ReactMarkdown from 'react-markdown';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
  }));

  
export default function AccessibleTabs2(props) {
  const [value, setValue] = useState(0);
  const [texto, setTexto] = useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangleTexto = (e) =>{
    const {value}= e.target;
    setTexto(value);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        aria-label="Tabs where each tab needs to be selected manually"
        onChange={handleChange} 
      >
        <Tab icon={<CodeIcon />}  />
        <Tab icon={<PreviewIcon   />}/>
        <Tab icon={<FlipIcon />}  />
      </Tabs>
      {/* Components*/}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            {(value===0)?
            <>
                <Grid item xs={12}>
                    <Item>
                        <TextField 
                        helperText="el formulario recibe datos en formato MarkDown"
                        value={texto}
                        rows={10}
                        multiline
                        onChange={handleChangleTexto}
                        fullWidth label="contenido" id="contenido" />
                    </Item>
                </Grid>
            </>
            :'' }

            {(value===1)?
            <>
                <Grid item xs={12}>
                    <Item2> 
                        <ReactMarkdown >
                            {texto}
                        </ReactMarkdown>
                    </Item2>
                </Grid>
            </>
            :'' }
            {(value===2)?
            <>
                <Grid item xs={6}>
                    <Item>
                        <TextField 
                        helperText="el formulario recibe datos en formato MarkDown"
                        value={texto}
                        rows={10}
                        multiline
                        onChange={handleChangleTexto}
                        fullWidth label="contenido" id="contenido" />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item2> 
                        <ReactMarkdown >
                            {texto}
                        </ReactMarkdown>
                    </Item2>
                </Grid>
            </>
            :'' }
        </Grid>
      </Box>
      
    </Box>
  );
}
