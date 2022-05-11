import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '../Rating';
import './index.scss';
import { Chip } from '@mui/material';
export const Product = React.forwardRef(
  ({ trademark, name, src, rating, price, chip }, ref) => {
    const mapChip = (chip) => {
      switch (chip) {
        case 'sale': {
          return 'warning';
        }
        case 'hot': {
          return 'error';
        }
        case 'new': {
          return 'success';
        }
        default: {
          return 'info';
        }
      }
    };
    const mapColor = {
      sale: 'warning',
      hot: 'error',
      new: 'success',
    };

    return (
      <Card
        className="product"
        style={{ position: 'relative' }}
        sx={{ maxWidth: 345 }}
      >
        <CardMedia component="img" image={src} alt="green iguana" />
        <CardContent className="text-center">
          <Chip className="chip" label={chip} color={mapColor[chip]} />
          <Typography className="mb-2" variant="body2" color="text.secondary">
            {trademark}
          </Typography>
          <Typography
            className="mb-2"
            gutterBottom
            variant="h5"
            component="div"
          >
            {name}
          </Typography>

          <Rating className="mb-2" rating={rating || 5}></Rating>
          <h4 className="price">{price || 999}đ</h4>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  },
);
export default Product;
