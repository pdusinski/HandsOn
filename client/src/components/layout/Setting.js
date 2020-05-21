import React, { Fragment } from "react";
import Spinner from "./Spinner";
import { connect } from "react-redux";
import DashboardMenu from "./DashboardMenu.js";

const Setting = ({ user, loading }) => {
  return (
    <div className="dashContainer">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <DashboardMenu user={user} />
          <div className="dashContent">
            <div className="summaryBox">
              <h4>Dzień dobry,</h4>
              <p>
                Chciałbym podziękować za poświęcony czas na obejrzenie mojej
                aplikacji. Jest to pierwsza wersja, której celem jest pokazanie
                moich umiejętności tworzenia przy użyciu JavaScript.
              </p>
              <br />
              <p>Aplikacja nie jest ukończona, dlatego:</p>
              <span>1. Nie wszystkie funkcje z API zostały wykorzystane </span>
              <span>
                2. Nie wszystkie opcje zachowań użytownika zostały stworzone.
              </span>
              <br />
              <p>W następnym etapie rozbudowy aplikacji zostanie:</p>
              <span>
                1. Stworzony system zapisywania czasu pracy pracownika nad danym
                zadaniem
              </span>
              <span>2. Dodana opcja zakończenia projektu.</span>
              <span>3. Dodana opcja zmiany i odzyskiwania hasła.</span>
              <span>3. Poprawiona forma wyświetlania błędów.</span>

              <p>
                Wszystkie przyszłe zmiany będą w pozytywny sposób wpływać na UX.
              </p>

              <br />
              <p>W razie pytań, proszę o kontakt.</p>
              <br />
              <p>
                <b>Pozdrawiam</b>
              </p>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(Setting);
