# postcss-simple-include

Use `@include` with basic CSS classes instead of mixins.

## Usage

This input:

    .colors {
        background-color: white;
        color: black;
    }

    .padding {
        padding: 1rem 0;
    }

    main {
        @include .colors;
        @include .padding;
    }

Will generate into:

    .colors {
        background-color: white;
        color: black;
    }

    .padding {
        padding: 1rem 0;
    }

    main {
        background-color: white;
        color: black;
        padding: 1rem 0;
    }

This syntax is supported too:

    main {
        @include .colors, .padding;
    }

## License

MIT.
