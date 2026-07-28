const BUTTON_SELECTOR = ".button";
const EFFECT_CLASS = "button--click-effect";
const EFFECT_DURATION = 360;

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

    if (existingTimer) {
        clearTimeout(existingTimer);
    }

    /*
     * Remove the class first so rapidly repeated clicks can restart
     * the animation from the beginning.
     */
    button.classList.remove(EFFECT_CLASS);

    /*
     * Reading offsetWidth forces the browser to finish the class
     * removal before the class is added again.
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
    if (
        event.key !== "Enter" &&
        event.key !== " "
    ) {
        return;
    }

    if (event.repeat) {
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