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

export enum Countries {
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
    [Countries.Australia]: AUSTRALIA_CITIES,
    [Countries.Brazil]: BRAZIL_CITIES,
    [Countries.German]: GERMAN_CITIES,
    [Countries.Kazakhstan]: KAZAKHSTAN_CITIES,
    [Countries.Denmark]: DENMARK_CITIES,
    [Countries.Switzerland]: SWITZERLAND_CITIES,
    [Countries.Spain]: SPAIN_CITIES,
    [Countries.Finland]: FINLAND_CITIES,
    [Countries.France]: FRANCE_CITIES,
    [Countries.GreatBritain]: GREAT_BRITAIN_CITIES,
    [Countries.Ireland]: IRELAND_CITIES,
    [Countries.Mexico]: MEXICAN_CITIES,
    [Countries.Netherlands]: NETHERLAND_CITIES,
    [Countries.Norway]: NORWAY_CITIES,
    [Countries.NewZealand]: NEW_ZEALAND_CITIES,
    [Countries.Serbia]: SERBIAN_CITIES,
    [Countries.Turkey]: TURKEY_CITIES,
    [Countries.Ukraine]: UKRAINE_CITIES,
    [Countries.USA]: USA_CITIES,
    [Countries.Belarus]: BELARUS_CITIES,
    [Countries.Russia]: RUSSIAN_CITIES,
};
