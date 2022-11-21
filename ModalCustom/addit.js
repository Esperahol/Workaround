//this may need to be added to App component to make modal work
/*
<div className="App">
        <button
          class="toggle-button"
          id="centered-toggle-button"
          onClick={e => {
            this.showModal(e);
          }}
        ></button>
    </div>
*/

// this is the show button for the modal - you will likely need to add it
/*
<button  onClick={e => {
              this.showModal();
         }}
          > show Modal </button>
          */

//this is the function for showing the modal
state = {
    show: false
  };
  showModal = e => {
    this.setState({
      show: true
    });
  };