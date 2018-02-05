import React, {Component} from 'react';
import { connect } from 'react-redux'
import { render } from 'react-dom';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import { fetchPhotos } from '../store'
// const photos = [
//   { src: '/test-photos/IMG_0165.jpg', width: 4, height: 3 },
//   { src: '/test-photos/IMG_0269.jpg', width: 1, height: 1 },
//   { src: '/test-photos/IMG_0305.jpg', width: 3, height: 4 },
//   { src: 'https://s3.amazonaws.com/where-in-the-world-gh/girl.jpg', width: 3, height: 4 },
// ];


class GalleryView extends Component {
  constructor(props) {
    super(props);
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  componentDidMount(props) {
    this.props.fetchPhotos(this.props.match.params.teamId)

  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  render(props) {
    const {photos, currentTeam} = this.props
    console.log(photos)
    return (
      <div>
        {photos.photos && photos.photos.map(photo => <img src={photo.url} height="400" width="350"></img>)}
      </div>
    )
  }
}

const mapState = ({currentTeam, photos}) => ({currentTeam, photos})

const mapDispatch = (dispatch) => {
  return {
    fetchPhotos(teamId) {
      dispatch(fetchPhotos(teamId))
    }
  }
}


export default connect(mapState, mapDispatch)(GalleryView)

/**
 *  <Gallery photos={photos.length && photos} onClick={this.openLightbox} />
      <Lightbox images={photos.length && photos}
        onClose={this.closeLightbox}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        currentImage={this.state.currentImage}
        isOpen={this.state.lightboxIsOpen}
      />
 */