import { memo } from 'react';

function Seal() {
  return (
    <svg className="seal-svg" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="waxGrad" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#E0809F" />
          <stop offset="100%" stopColor="#A8446A" />
        </radialGradient>
      </defs>
      <path
        d="M24 43.5l-2.4-2.2C12.800 33.300 7 28.100 7 21.700 7 16.500 11 12.500 16 12.500c3.100 0 6.100 1.500 8 3.900 1.900-2.400 4.900-3.900 8-3.900 5 0 9 4 9 9.200 0 6.400-5.800 11.600-14.600 19.600L24 43.500z"
        fill="url(#waxGrad)"
      />
      <path
        d="M16.500 17.500c-2.200.4-3.800 2.200-3.800 4.600"
        stroke="#fff"
        strokeOpacity=".45"
        strokeWidth="1.800"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * Screen one: the sealed envelope scene.
 * stage: 'sealed' | 'opening' | 'revealed'
 */
function Envelope({ config, stage, onOpen }) {
  const isOpen = stage !== 'sealed';
  const leaving = stage === 'revealed';

  return (
    <section
      className={`scene${leaving ? ' leaving' : ''}`}
      aria-label="Birthday envelope"
    >
      <div className="scene-inner">
        <p className="scene-intro">{config.introText}</p>
        <h1 className="scene-title">Hey, {config.friendName}! 🎀</h1>
        <p className="scene-sub">{config.subtitle}</p>

        <div className="env-perspective">
          <button
            type="button"
            className="env-btn"
            onClick={onOpen}
            aria-disabled={isOpen}
            aria-label={
              isOpen
                ? 'Opening your birthday letter'
                : `Open your birthday letter, ${config.friendName}`
            }
          >
            <div className={`env-bob${isOpen ? ' stopped' : ''}`}>
              <div className={`envelope${isOpen ? ' open' : ''}`}>
                <div className="env-back" />

                <div className="letter" aria-hidden="true">
                  <span className="letter-script">For {config.friendName}</span>
                  <span className="letter-lines">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>

                <div className="env-pocket" aria-hidden="true">
                  <i className="pk pk-left" />
                  <i className="pk pk-right" />
                  <i className="pk pk-bottom" />
                </div>

                <div className="flap" aria-hidden="true">
                  <span className="flap-face flap-out" />
                  <span className="flap-face flap-in" />
                </div>

                <div className="seal" aria-hidden="true">
                  <Seal />
                </div>
              </div>
            </div>
          </button>
        </div>

        <p className={`scene-hint${isOpen ? ' hidden' : ''}`}>{config.tapHint}</p>
      </div>
    </section>
  );
}

export default memo(Envelope);
