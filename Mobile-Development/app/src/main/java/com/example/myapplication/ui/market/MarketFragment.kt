package com.example.myapplication.ui.market

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.myapplication.R

class MarketFragment : Fragment() {
    private lateinit var marketViewModel : MarketViewModel

    override fun onCreateView(
        inflater : LayoutInflater , container : ViewGroup? ,
        savedInstanceState : Bundle?
    ) : View? {
        // Inflate the layout for this fragment
        //marketViewModel = ViewModelProvider(this)[marketViewModel::class.java]

        return inflater.inflate(R.layout.fragment_market , container , false)
    }

}