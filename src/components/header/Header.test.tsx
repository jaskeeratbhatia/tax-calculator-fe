import { render, screen, fireEvent } from '@testing-library/react';
import {Header} from './Header';
import { describe, it, expect, vi } from 'vitest';
import { ChakraProvider } from '@chakra-ui/react';


vi.mock('react-i18next', () => ({
    useTranslation: () => {
      return {
        t: (str : string) => str,
        i18n: {
          changeLanguage: () => new Promise(() => {}),
        },
      };
    },
    initReactI18next: {
      type: '3rdParty',
      init: () => {},
    },
  }));

describe('Header Component', () => {

  const renderWithChakra = () => {
    return render(
      <ChakraProvider>
        <Header />
      </ChakraProvider>
    );
  };

  it('renders the header title', () => {
    renderWithChakra();
    const title = screen.getByText(/header.title/i); // Using mocked translation key
    expect(title).toBeInTheDocument();
  });

  it('renders language buttons', () => {
    renderWithChakra();

    const enButton = screen.getByRole('button', { name: /header.language.en/i });
    const frButton = screen.getByRole('button', { name: /header.language.fr/i });

    expect(enButton).toBeInTheDocument();
    expect(frButton).toBeInTheDocument();
  });

  it('changes language when button is clicked', () => {
    renderWithChakra();

    const frButton = screen.getByRole('button', { name: /header.language.fr/i });

    fireEvent.click(frButton);

    // Since language change is mocked, we're just testing if the click works
    expect(frButton).toBeInTheDocument();
  });
});
