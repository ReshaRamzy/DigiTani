package com.example.myapplication.ui.scan

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.example.myapplication.R

class ScanFragment : Fragment() {
    private lateinit var viewModel : ScanViewModel

    override fun onCreateView(
        inflater : LayoutInflater , container : ViewGroup? ,
        savedInstanceState : Bundle?
    ) : View? {
        // Inflate the layout for this fragment
        viewModel = ViewModelProvider(this)[ScanViewModel::class.java]
        val root =  inflater.inflate(R.layout.fragment_scan , container , false)

        val textView: TextView = root.findViewById(R.id.textScan)
        viewModel.text.observe(viewLifecycleOwner) {
            textView.text = it
        }
        return root
    }
}