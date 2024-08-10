import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    flat: false,
    hostel: false,
    sharing: false,
    parking: false,
    furnished: false,
    maintenance: false,
    utilities: false,
    wifi: false,
    security: false,
    outdoorSpace: false,
    heatingCooling: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const flatFromUrl = urlParams.get('flat');
    const hostelFromUrl = urlParams.get('hostel');
    const sharingFromUrl = urlParams.get('sharing');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const maintenanceFromUrl = urlParams.get('maintenance');
    const utilitiesFromUrl = urlParams.get('utilities');
    const wifiFromUrl = urlParams.get('wifi');
    const securityFromUrl = urlParams.get('security');
    const outdoorSpaceFromUrl = urlParams.get('outdoorSpace');
    const heatingCoolingFromUrl = urlParams.get('heatingCooling');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      flatFromUrl ||
      hostelFromUrl ||
      sharingFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      maintenanceFromUrl ||
      utilitiesFromUrl ||
      wifiFromUrl ||
      securityFromUrl ||
      outdoorSpaceFromUrl ||
      heatingCoolingFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        flat: flatFromUrl === 'true' ? true : false,
        hostel: hostelFromUrl === 'true' ? true : false,
        sharing: sharingFromUrl === 'true' ? true : false,
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        maintenance: maintenanceFromUrl === 'true' ? true : false,
        utilities: utilitiesFromUrl === 'true' ? true : false,
        wifi: wifiFromUrl === 'true' ? true : false,
        security: securityFromUrl === 'true' ? true : false,
        outdoorSpace: outdoorSpaceFromUrl === 'true' ? true : false,
        heatingCooling: heatingCoolingFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'flat' || e.target.id === 'hostel' || e.target.id === 'sharing') {
      // Toggle the selection of the type
      setSidebardata((prevState) => ({
        ...prevState,
        type: prevState.type === e.target.id ? 'all' : e.target.id,
      }));
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'maintenance' ||
      e.target.id === 'utilities' ||
      e.target.id === 'wifi' ||
      e.target.id === 'security' ||
      e.target.id === 'outdoorSpace' ||
      e.target.id === 'heatingCooling'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('flat', sidebardata.flat);
    urlParams.set('hostel', sidebardata.hostel);
    urlParams.set('sharing', sidebardata.sharing);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('maintenance', sidebardata.maintenance);
    urlParams.set('utilities', sidebardata.utilities);
    urlParams.set('wifi', sidebardata.wifi);
    urlParams.set('security', sidebardata.security);
    urlParams.set('outdoorSpace', sidebardata.outdoorSpace);
    urlParams.set('heatingCooling', sidebardata.heatingCooling);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='flat'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'flat'}
              />
              <span>Flat</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='hostel'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'hostel'}
              />
              <span>Hostel</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sharing'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'sharing'}
              />
              <span>Sharing</span>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='maintenance'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.maintenance}
              />
              <span>Maintenance Services</span>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='utilities'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.utilities}
              />
              <span>Utilities (Electricity, Water, Gas)</span>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='wifi'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.wifi}
              />
              <span>Wifi Connectivity</span>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='security'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.security}
              />
              <span>Safety and Security Features</span>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='outdoorSpace'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.outdoorSpace}
              />
              <span>Outdoor Space (Backyard, Balcony)</span>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='heatingCooling'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.heatingCooling}
              />
              <span>Heating and Cooling</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to high</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Listing results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
