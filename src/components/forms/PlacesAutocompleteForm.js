import PlacesAutocomplete from 'react-places-autocomplete';
import { Form } from 'react-bootstrap';

const PlacesAutocompleteForm = ({ address, onAddressFieldChanged, onAddressSelectionClicked }) => {
    return(
        <PlacesAutocomplete value={address} onChange={onAddressFieldChanged} onSelect={onAddressSelectionClicked}>
        {({ getInputProps, suggestions, getSuggestionItemProps}) => (
          <div>
            <Form.Control
              {...getInputProps({ 
                placeholder: 'Enter Address',
                className: 'input-cm',
                type: 'text',
                name: 'address'
              })}
            />
          
          { suggestions.length > 0 && 
            <div className='suggestions'>
              {suggestions.map((suggestion) => {
                return (
                  <div key={suggestion.index} className='suggestion' {...getSuggestionItemProps(suggestion)}>
                    {suggestion.description}
                  </div>
                )
              })}
            </div>}
          </div>
        )}
      </PlacesAutocomplete>
    )

}

export default PlacesAutocompleteForm;