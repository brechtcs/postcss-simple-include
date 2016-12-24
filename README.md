# postcss-simple-include

This is a rough proof of concept for a simple implementation of includes without using mixins. The basic functionality works, but not recommended for production use yet.

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
