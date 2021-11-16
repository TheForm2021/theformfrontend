import './App.css';
import { Link } from 'react-router-dom';
//import ListItem from '@mui/material/ListItem';

const List = ({ data }) => {

    return (
        data.map((i) => (     
            <div className='Inquiry' key={i.questionnaryId}>
                <Link to={`/form/${i.questionnaryId}`}>
                    <h3>{i.header}</h3>
                    <label>{i.description}</label>
                </Link>
            </div>
        ))
    );
}

export default List;