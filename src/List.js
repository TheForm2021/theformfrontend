import './App.css';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
//import ListItem from '@mui/material/ListItem';

const List = ({ data }) => {

    return (
        data.map((i) => (
            <div>  
                <Card className='Cont'>  
                    <CardActionArea className='Inquiry' key={i.questionnaryId}>
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
            </div>
        ))
    );
}

export default List;