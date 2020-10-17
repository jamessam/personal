import Link from 'next/link';

const ImageTile = ({ image, destination }) => {
  if (destination.startsWith('http')) {
    return (
      <a href={destination} target="_blank" rel="noopener noreferrer">
        <img
          src={`${image.fields.file.url}?w=${imageSize}&h=${imageSize}`}
          alt={image.fields.description}
          style={imageStyle}
        />
      </a>
    );
  } else {
    return (
      <Link href={destination}>
        <a target="_blank" rel="noopener noreferrer">
          <img
            src={`${image.fields.file.url}?w=${imageSize}&h=${imageSize}`}
            alt={image.fields.description}
            style={imageStyle}
          />
        </a>
      </Link>
    );
  }
};

export default ImageTile;

const imageSize = 320;

const imageStyle = {
  flex: `0 0 ${imageSize}`,
  margin: `1%`,
};
