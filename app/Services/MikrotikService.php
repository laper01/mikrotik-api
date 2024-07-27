<?php

namespace App\Services;

use RouterOS\Config;
use RouterOS\Client;
use RouterOS\Query;

class MikrotikService
{
    /**
     * Create a new class instance.
     */
    protected $client;

    public function __construct()
    {
        $config = new Config([
            'host' => env('MIKROTIK_HOST'),
            'port' => (int) env('MIKROTIK_PORT', 8728),
            'user' => env('MIKROTIK_USERNAME'),
            'pass' => env('MIKROTIK_PASSWORD'),
        ]);

        $this->client = new Client($config);
    }

    public function getHotspotUsers()
    {
        $query = new Query('/ip/hotspot/user/print');
        return $this->client->query($query)->read();
    }



    public function findUserByName($username)
    {
        $query = (new Query('/ip/hotspot/user/print'))
            ->where('name', $username);

        $response = $this->client->query($query)->read();
        return $response ? $response[0] : null;
    }

    public function getHotspotUserDetails($username = null)
    {
        $query = new Query('/ip/hotspot/user/print');

        // Add more properties to fetch
        $query->add('=.proplist=.id,name,profile,uptime,bytes-in,bytes-out,limit-bytes-in,limit-bytes-out,last-logged-out,disabled,comment');

        if ($username) {
            $query->where('name', $username);
        }

        return $this->client->query($query)->read();
    }

    public function updateHotspotUserPassword($username, $newPassword)
    {
        $query = new Query('/ip/hotspot/user/set');
        $query->equal('.id', $username);
        $query->equal('password', $newPassword);

        return $this->client->query($query)->read();
    }


    public function addHotspotUser($username, $password, $profile = null)
    {
        $query = new Query('/ip/hotspot/user/add');
        $query->equal('name', $username);
        $query->equal('password', $password);

        if ($profile) {
            $query->equal('profile', $profile);
        }

        return $this->client->query($query)->read();
    }


}
