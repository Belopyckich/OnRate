import {AUSTRALIA_CITIES} from './au';
import {BRAZIL_CITIES} from './br';
import {BELARUS_CITIES} from './by';
import {DENMARK_CITIES} from './dk';
import {SPAIN_CITIES} from './es';
import {FINLAND_CITIES} from './fi';
import {FRANCE_CITIES} from './fr';
import {GREAT_BRITAIN_CITIES} from './gb';
import {GERMAN_CITIES} from './ge';
import {IRELAND_CITIES} from './ie';
import {KAZAKHSTAN_CITIES} from './kz';
import {MEXICAN_CITIES} from './mx';
import {NETHERLAND_CITIES} from './nl';
import {NORWAY_CITIES} from './no';
import {NEW_ZEALAND_CITIES} from './nz';
import {SERBIAN_CITIES} from './rs';
import {RUSSIAN_CITIES} from './ru';
import {SWITZERLAND_CITIES} from './sw';
import {TURKEY_CITIES} from './tk';
import {UKRAINE_CITIES} from './ua';
import {USA_CITIES} from './us';

export enum Country {
    Belarus = 'Belarus',
    Russia = 'Russia',
    Australia = 'Australia',
    Brazil = 'Brazil',
    German = 'German',
    Kazakhstan = 'Kazakhstan',
    Denmark = 'Denmark',
    Switzerland = 'Switzerland',
    Spain = 'Spain',
    Finland = 'Finland',
    France = 'France',
    GreatBritain = 'GreatBritain',
    Ireland = 'Ireland',
    Mexico = 'Mexico',
    Netherlands = 'Netherlands',
    Norway = 'Norway',
    NewZealand = 'NewZealand',
    Serbia = 'Serbia',
    Turkey = 'Turkey',
    Ukraine = 'Ukraine',
    USA = 'USA',
}

export const CITIES = {
    [Country.Australia]: AUSTRALIA_CITIES,
    [Country.Brazil]: BRAZIL_CITIES,
    [Country.German]: GERMAN_CITIES,
    [Country.Kazakhstan]: KAZAKHSTAN_CITIES,
    [Country.Denmark]: DENMARK_CITIES,
    [Country.Switzerland]: SWITZERLAND_CITIES,
    [Country.Spain]: SPAIN_CITIES,
    [Country.Finland]: FINLAND_CITIES,
    [Country.France]: FRANCE_CITIES,
    [Country.GreatBritain]: GREAT_BRITAIN_CITIES,
    [Country.Ireland]: IRELAND_CITIES,
    [Country.Mexico]: MEXICAN_CITIES,
    [Country.Netherlands]: NETHERLAND_CITIES,
    [Country.Norway]: NORWAY_CITIES,
    [Country.NewZealand]: NEW_ZEALAND_CITIES,
    [Country.Serbia]: SERBIAN_CITIES,
    [Country.Turkey]: TURKEY_CITIES,
    [Country.Ukraine]: UKRAINE_CITIES,
    [Country.USA]: USA_CITIES,
    [Country.Belarus]: BELARUS_CITIES,
    [Country.Russia]: RUSSIAN_CITIES,
};
