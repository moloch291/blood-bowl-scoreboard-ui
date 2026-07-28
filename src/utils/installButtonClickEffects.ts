const BUTTON_SELECTOR = ".button";
const EFFECT_CLASS = "button--click-effect";
const EFFECT_DURATION = 600;

const cleanupTimers = new WeakMap<
    HTMLButtonElement,
    ReturnType<typeof setTimeout>
>();

function findButton(
    target: EventTarget | null,
): HTMLButtonElement | null {
    if (!(target instanceof Element)) {
        return null;
    }

    const button =
        target.closest<HTMLButtonElement>(BUTTON_SELECTOR);

    if (!button || button.disabled) {
        return null;
    }

    return button;
}

function playButtonEffect(button: HTMLButtonElement) {
    const existingTimer = cleanupTimers.get(button);

    if (existingTimer !== undefined) {
        clearTimeout(existingTimer);
    }

    button.classList.remove(EFFECT_CLASS);

    /*
     * Force the browser to register the class removal so repeated
     * presses restart the animation from its first frame.
     */
    void button.offsetWidth;

    button.classList.add(EFFECT_CLASS);

    const cleanupTimer = setTimeout(() => {
        button.classList.remove(EFFECT_CLASS);
        cleanupTimers.delete(button);
    }, EFFECT_DURATION);

    cleanupTimers.set(button, cleanupTimer);
}

function handlePointerDown(event: PointerEvent) {
    if (event.button !== 0) {
        return;
    }

    const button = findButton(event.target);

    if (button) {
        playButtonEffect(button);
    }
}

function handleKeyDown(event: KeyboardEvent) {
    const isActivationKey =
        event.key === "Enter" ||
        event.key === " ";

    if (!isActivationKey || event.repeat) {
        return;
    }

    const button = findButton(event.target);

    if (button) {
        playButtonEffect(button);
    }
}

export function installButtonClickEffects() {
    document.addEventListener(
        "pointerdown",
        handlePointerDown,
    );

    document.addEventListener(
        "keydown",
        handleKeyDown,
    );

    return function removeButtonClickEffects() {
        document.removeEventListener(
            "pointerdown",
            handlePointerDown,
        );

        document.removeEventListener(
            "keydown",
            handleKeyDown,
        );
    };
}