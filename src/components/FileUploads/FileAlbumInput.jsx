import React from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

// const customStyles = {
//   option: (provided, state) => ({
//     ...provided,
//     borderBottom: '1px dotted pink',
//     color: state.isSelected ? 'red' : 'lightblue',
//     padding: "20px",
//   }),
//   control: () => ({
//     // none of react-select's styles are passed to <Control />
//     width: '200px',
//   }),
//   singleValue: (provided, state) => {
//     const opacity = state.isDisabled ? 0.5 : 1;
//     const transition = 'opacity 300ms';
//
//     return { ...provided, opacity, transition };
//   }
// }

const FileAlbumInput = ({loadAlbumOptions, parseAlbumOptions, onSelectAlbum, onCreateAlbum, albumInput}) => {

  return (
    <div className="file-album-input-container">
      <CreatableSelect
        className="react-select-container"
        classNamePrefix="react-select"
        onChange={onSelectAlbum}
        name="album"
        value={albumInput()}
        createOptionPosition="first"
        isFixed
        options={parseAlbumOptions()}
        isFocused
        isClearable
        isSearchable
        blurInputOnSelect={false}
        captureMenuScroll={true}
        closeMenuOnScroll={false}
        closeMenuOnSelect={true}
        autoFocus
        controlShouldRenderValue
        />
    </div>
  )
}

export default FileAlbumInput
