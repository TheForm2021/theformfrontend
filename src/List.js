import './App.css';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
//import ListItem from '@mui/material/ListItem';

const List = ({ data, user }) => {

    return (
        <>
        <Link to={`/${user}`} >
        {user}
        </Link>
        {data.map((i) => (
            <Card className='Cont' key={i.questionnaryId}>  
                <CardActionArea className='Inquiry'>
                    <Link to={`/form/${i.questionnaryId}`}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {i.header}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {i.description}
                            </Typography>
                        </CardContent>
                    </Link>
                </CardActionArea>
            </Card>
        ))}
        </>
    );
}

export default List;