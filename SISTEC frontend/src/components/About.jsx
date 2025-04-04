import './About.css';

function Acerca() {
  return (
    <div className="acerca-container">
      <div className="acerca-card acerca-nosotros">
        <h3>Acerca de nosotros</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </p>
      </div>

      <div className="acerca-card acerca-mision">
        <h3>Misión</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s.
        </p>
      </div>

      <div className="acerca-card acerca-vision">
        <h3>Visión</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s.
        </p>
      </div>
    </div>
  );
}

export default Acerca;
