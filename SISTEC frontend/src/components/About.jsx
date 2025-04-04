import './About.css';

function About() {
  return (
    <div className="about-container">
      <div className="card about">
        <h2>Acerca de nosotros</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
      </div>

      <div className="card mission">
        <h2>Misión</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
      </div>

      <div className="card vision">
        <h2>Visión</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
      </div>
    </div>
  );
}

export default About;
